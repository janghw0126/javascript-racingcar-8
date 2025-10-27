import {Console,Random} from "@woowacourse/mission-utils"

class App {
  async run() {
    const input = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n");

    // 자동차 이름 검증 및 추출
    const carNames = this.validateCarName(input);

    // 자동차 이동 상태 객체 선언
    let carStates = {};
    carNames.forEach((name) => {
      carStates[name] = 0;
    });

    // 시도 횟수 입력 및 검증
    const raceCount = Number(await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n"));
    this.validateRaceCount(raceCount);

    Console.print("");
    Console.print("실행 결과");

    // 시도 횟수만큼 반복하면서 경주 게임 실행
    for (let i = 0; i < raceCount; i++) {
      this.checkCarMovement(carStates);
      this.printCarStates(carStates);
      Console.print("");
    }

    Console.print(`최종 우승자 : ${this.determineWinner(carStates).join(", ")}`);
  }

  // 자동차 이름 검증
  validateCarName(input){
    if(/\s/.test(input)){
      throw new Error("[ERROR] 입력값 사이에 공백이 있습니다.");
    }

    if(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9,]/.test(input)){
      throw new Error("[ERROR] 쉼표(,) 이외의 다른 구분 기호를 사용하였습니다.");
    }

    // 자동차 이름 분리
    let carNames = input.split(",");

    if(carNames.length===1){
      throw new Error("[ERROR] 자동차가 하나만 입력되었습니다.");
    }

    for(const name of carNames){
      if (name === "") throw new Error("[ERROR] 자동차의 이름이 비어있습니다.");
      if (name.length > 5) throw new Error("[ERROR] 자동차의 이름이 5자 초과입니다.");
    };
    
    return carNames;
  };

  // 시도 횟수 검증
  validateRaceCount(raceCount){
    if(raceCount===""){
      throw new Error("[ERROR] 시도 횟수가 비어있습니다.");
    }
    if(isNaN(raceCount)){
      throw new Error("[ERROR] 숫자가 아닌 문자를 입력받았습니다.");
    }
    if(Number(raceCount)<=0){
      throw new Error("[ERROR] 0 이하의 숫자를 입력하였습니다.");
    }
  }

  // 자동차 전진 여부 판단
  checkCarMovement(carStates){
    for (const name in carStates){
      let randomNumber = Random.pickNumberInRange(0, 9);
      if(randomNumber>=4){
        this.moveCar(carStates,name);
      }
    }
  }

  // 자동차 한 칸 전진
  moveCar(carStates,name){
    carStates[name] += 1;
  }

  // 현재 라운드별 자동차 이동상태 출력
  printCarStates(carStates) {
    Object.entries(carStates).forEach(([name,position]) => {
      Console.print(`${name} : ${"-".repeat(position)}`);
    });
  }

  // 우승자 판단
  determineWinner(carStates){
    const maxPosition = Math.max(...Object.values(carStates));
    const winner = Object.keys(carStates).filter(
      (name) => carStates[name] === maxPosition);
    return winner;
    };
}

export default App;
