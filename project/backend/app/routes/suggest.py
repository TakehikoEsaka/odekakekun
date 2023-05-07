from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import random
import string
import pandas as pd
from pathlib import Path
import time

import models
from database import get_db
import oauth2

import os
from dotenv import load_dotenv
import openai
from io import StringIO
import uuid

load_dotenv(Path(__file__).resolve().parent / Path(".env"), verbose=True)
# TODO 環境変数からとってこれるようにする
# openai.api_key = os.environ.get("OPENAI_API_KEY")
openai.api_key = "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"

sample_response = {'suggest_place': {0: 'イナクア', 1: '三鷹の森ジブリ美術館', 2: '井の頭自然文化園'}, 
                   'suggest_description': {0: '絵本やおもちゃ、手作りの雑貨などを取り揃えた、かわいらしいお店。カフェも併設されているので、ほっと一息つきたいときにおすすめ。', 
                          1: 'スタジオジブリの作品展示や特別上映が楽しめる、ファン必見の美術館。予約が必要なので注意。', 
                          2: 'アジアの動物や植物が見られる自然公園。動物たちに近づいて撮影することもでき、家族で楽しめる場所。入園料が必要。'}, 
                  'suggest_distance': {0: '4km', 1: '9km', 2: '7km'}}

router = APIRouter()

def get_suggest(db: Session, email : str):
    suggests = db.query(models.Suggest).filter(models.Suggest.email == email).first()
    if not suggests:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Suggests with {email} not found')
    return suggests

def ask_chatgpt(question):
    start_time = time.time()
    timeout_seconds = 5

    # 処理時間が長い処理
    # while True:
        # 一定間隔で状態をチェック
        # ここにChatGPTの処理を入れる
        # if some_condition:
        #     break
        
        # # タイムアウトした場合
        # if time.time() - start_time > timeout_seconds:
        #     print("Timeout occurred")
        #     break

    # timeoutオプションが使えない（おそらくアクセス動いてるから？もし動いてないなら自分でTimeを測ってエラーをなげるようにする
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=[{"role": "user", "content": question},],timeout=1).choices[0]["message"]["content"].strip()
    df = pd.read_csv(StringIO(response), sep='|', header = 0, skiprows=[1], skipinitialspace=True)

    # 列目に空白が入る時があるので除外
    df.columns = df.columns.str.strip()

    # 余分なカラムが生成される場合があるので除外
    # 英語名に変換
    df = df[["場所名", "説明", "距離"]].rename(columns={"場所名" : "suggest_place", "説明" : "suggest_description", "距離" : "suggest_distance"})

    # 値に空白が入る時があるので除外
    for col in df.columns:
        df[col] = df[col].str.strip()

    response_dict = df.to_dict(orient='dict')

    return response_dict

@router.post("/suggest", tags = ["suggest"])
def suggest(place : str, time : str, way : str, current_user: models.UserInfo = Depends(oauth2.get_current_active_user), db: Session = Depends(get_db)):
    
    use_chatgpt = True
    question = "{}から{}以内で{}を使っていけるおすすめの場所を3つ表形式で教えて下さい。場所名・距離・説明を列にして下さい".format(place, time, way)

    # ここでanswerをchat-gptからget
    if use_chatgpt:
      # TODO タイムアウト処理を入れる
      print("guess start")
      answer = ask_chatgpt(question)
      print("guess end")
    #   answer = sample_response
    else:
      answer = "".join(random.choice(string.ascii_lowercase) for i in range(10))

    print(answer)

    # ログインしている時はDBに追加・そうでない時は追加しない
    # TODO モデルにGoogleMapのリンクを入れるようにする
    if current_user:
        question_uuid = str(uuid.uuid4())
        new_suggests = []
        for i in range(len(sample_response["suggest_place"])):
            suggest_place = answer["suggest_place"][i]
            suggest_description = answer["suggest_description"][i]
            suggest_distance = answer["suggest_distance"][i]
            new_suggests.append({
                "user_id" : current_user.user_id,
                "question_uuid" : question_uuid,
                "place" : place, 
                "time" : time,
                "way" : way,
                "suggest_place" : suggest_place,
                "suggest_description" : suggest_description, 
                "suggest_distance" : suggest_distance })
            
        db.bulk_insert_mappings(models.Suggest, new_suggests)
        # db.bulk_update_mappings(models.Suggest, new_suggests)
        db.commit()

    return answer

@router.get("/get_all_suggest", tags = ["suggest"])
def get_suggest(current_user: models.UserInfo = Depends(oauth2.get_current_active_user), db: Session = Depends(get_db)):

    user = db.query(models.UserInfo).filter(models.UserInfo.user_id == current_user.user_id).first()

    df = pd.DataFrame(columns=["question_uuid", "place", "time", "way", "suggest_place"])

    for s in user.suggestions[-1:-10:-1]:
        df = pd.concat([df, pd.DataFrame([{"question_uuid" : s.question_uuid,
                                        "place": s.place,
                                        "time": s.time, 
                                        "way": s.way,
                                        "suggest_place": s.suggest_place}])], ignore_index=True)
    print("success !")
    print("df" , df)
    return df.to_dict(orient="records")

# a = [{}, {}, {}]
# uuid = None
# for i, item in enumerate(a):
#     if uuid_queue != uuid:
#         uuid_queue = uuid
    
#     groupeddata[uuid] = item