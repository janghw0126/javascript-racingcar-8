import App from "../src/App";

// 전역 상수
const MOVING_FORWARD = 4;
const STOP = 3;

describe("자동차 이름 검증 테스트", () =>{
  const app = new App();

  // 정상 케이스
  test("쉼표로 구분된 올바른 자동차 이름 입력", ()=> {
    const result = app.validateCarName("pobi,woni,jun");
    expect(result).toEqual(["pobi","woni","jun"]);
  });

  test.each([
    [
      "자동차 이름 사이에 공백이 포함된 경우",
      "pobi, woni,jun",
      "[ERROR] 입력값 사이에 공백이 있습니다.",
    ],
    [
      "쉼표 이외의 다른 구분 기호 사용 시",
      "pobi:woni,jun",
      "[ERROR] 쉼표(,) 이외의 다른 구분 기호를 사용하였습니다.",
    ],
    [
      "자동차 이름이 하나만 입력된 경우",
      "pobi",
      "[ERROR] 자동차가 하나만 입력되었습니다.",
    ],
    [
      "자동차 이름이 5자 초과인 경우",
      "abcdef,car",
      "[ERROR] 자동차의 이름이 5자 초과입니다.",
    ],
    [
      "자동차 이름이 비어있는 경우",
      "pobi,,jun",
      "[ERROR] 자동차의 이름이 비어있습니다.",
    ],
  ])("%s 예외 발생",(_,input,expectedMessage) => {
    expect(()=> app.validateCarName(input).toThrow(expectedMessage));
  });
})