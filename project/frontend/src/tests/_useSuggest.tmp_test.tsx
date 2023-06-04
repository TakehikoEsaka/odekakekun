import { renderHook, act } from "@testing-library/react-hooks";
import axiosInstance from "../axios";
import { useSuggest } from "../hooks/useSuggest";
import { useRecoilState } from "recoil";
import { suggestState } from "../store/suggestState";
import axios from "axios";

// axiosをmock化する事を宣言する
jest.mock("axios");
jest.mock("recoil");

const response = {
  data: {
    name: "Tarou",
  },
};

describe("useSuggest", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should fetch suggest data and update recoil state", async () => {
    // Axiosインスタンスをスパイ
    const postApiMock = jest
      .spyOn(axios, "create")
      .mockReturnValue(axiosInstance);

    postApiMock.mockResolvedValueOnce({
      data: {
        place: "高円寺",
        time: "1時間",
        way: "自転車",
      },
    });

    const setSuggestMock = jest.fn();
    useRecoilState.mockReturnValueOnce([{}, setSuggestMock]);

    const { result } = renderHook(() => useSuggest());

    await act(async () => {
      await result.current.getSuggest("place", "time", "way");
    });

    expect(axiosMock).toHaveBeenCalledTimes(1);
    expect(axiosMock).toHaveBeenCalledWith("/suggest", null, {
      params: {
        place: "place",
        time: "time",
        way: "way",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mockAccessToken",
        accept: "application/json",
      },
      timeout: 60000,
    });

    expect(setSuggestMock).toHaveBeenCalledTimes(1);
    expect(setSuggestMock).toHaveBeenCalledWith({
      message: null,
      suggest_place: {
        // suggest_placeのデータ
      },
      suggest_description: {
        // suggest_descriptionのデータ
      },
      suggest_distance: {
        // suggest_distanceのデータ
      },
    });
  });

  test("should handle null response", async () => {
    const axiosMock = axiosInstance.post as jest.Mock;
    axiosMock.mockResolvedValueOnce({
      data: null,
    });

    const setSuggestMock = jest.fn();
    useRecoilState.mockReturnValueOnce([{}, setSuggestMock]);

    const { result } = renderHook(() => useSuggest());

    await act(async () => {
      await result.current.getSuggest("place", "time", "way");
    });

    expect(axiosMock).toHaveBeenCalledTimes(1);
    expect(setSuggestMock).toHaveBeenCalledTimes(1);
    expect(setSuggestMock).toHaveBeenCalledWith({
      message: "エラーがおきました。もう一度やり直してください",
      suggest_place: {},
      suggest_description: {},
      suggest_distance: {},
    });
  });

  test("should handle timeout error", async () => {
    const axiosMock = axiosInstance.post as jest.Mock;
    axiosMock.mockRejectedValueOnce({
      code: "ECONNABORTED",
      message: "Request timeout",
    });

    const setSuggestMock = jest.fn();
    useRecoilState.mockReturnValueOnce([{}, setSuggestMock]);

    const { result } = renderHook(() => useSuggest());

    await act(async () => {
      await result.current.getSuggest("place", "time", "way");
    });

    expect(axiosMock).toHaveBeenCalledTimes(1);
    expect(setSuggestMock).toHaveBeenCalledTimes(1);
    expect(setSuggestMock).toHaveBeenCalledWith({
      message:
        "ネットワークトラブルのため回答が出せませんでした。もう一度やり直すか暫くたってから再度お試し下さい。",
      suggest_place: {},
      suggest_description: {},
      suggest_distance: {},
    });
  });
});
