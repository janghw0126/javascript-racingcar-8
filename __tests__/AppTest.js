import App from "../src/App";

// 자동차 이름 검증 테스트 추가
describe("자동차 이름 검증 테스트", () =>{
  const app = new App();

  // 정상 케이스
  test("쉼표로 구분된 올바른 자동차 이름 입력", ()=> {
    const result = app.validateCarName("pobi,woni,jun");
    expect(result).toEqual(["pobi","woni","jun"]);
  });

  // 예외 케이스
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
      "abcdefg,car",
      "[ERROR] 자동차의 이름이 5자 초과입니다.",
    ],
    [
      "자동차 이름이 비어있는 경우",
      "pobi,,jun",
      "[ERROR] 자동차의 이름이 비어있습니다.",
    ],
  ])("%s 예외 발생",(_,input,expectedMessage) => {
    expect(()=> app.validateCarName(input)).toThrow(expectedMessage);
  });
})

// 시도 횟수 검증 테스트 추가
describe("시도 횟수 검증 테스트",()=>{
  const app = new App();

  // 예외 테스트
  test.each([
    [
      "시도 횟수 입력이 비어있을 경우",
      "",
      "[ERROR] 시도 횟수가 비어있습니다.",
    ],
    [
      "숫자가 아닌 문자를 입력받을 경우",
      "three",
      "[ERROR] 숫자가 아닌 문자를 입력받았습니다.",
    ],
    [
      "0 이하의 숫자를 입력했을 경우",
      "0",
      "[ERROR] 0 이하의 숫자를 입력하였습니다.",
    ],
  ])("%s 예외 발생",(_,input,expectedMessage)=>{
     expect(()=> app.validateRaceCount(input)).toThrow(expectedMessage);
  });

})