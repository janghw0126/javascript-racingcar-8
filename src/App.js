import {Console} from "@woowacourse/mission-utils"

class App {
  async run() {
    const input = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n")
  }

  // 자동차 이름 검증 함수
  validateCarName(input){
     // 자동차 이름 분리
    let carNames = input.split(",");

    return carNames;

  };
}

export default App;
