import {Console,Random} from "@woowacourse/mission-utils"

class App {
  async run() {
    const input = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n");

    // 자동차 이름 검증 함수 실행 및 이름 추출
    const carNames = this.validateCarName(input);

    // 자동차 이동 상태 객체 선언
    let carStates = {};
    carNames.forEach((name) => {
      carStates[name] = 0;
    });

    const raceCount = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
    this.validateRaceCount(raceCount);

    Console.print("");
    Console.print("실행 결과");

    // 시도할 횟수만큼 반복하면서 경주 게임 실행
    for (let i = 0; i < raceCount; i++) {
      this.checkCarMovement(carStates);
      this.printCarStates(carStates);
      Console.print("");
    }

    Console.print(`최종 우승자 : ${this.determineWinner(carStates)}`);
  }

  // 자동차 이름 검증 함수
  validateCarName(input){
    // 자동차 이름 검증
    if(!input.includes(",")){
      throw new Error("[ERROR] 쉼표 구분자가 아닌 다른 구분자를 사용하였습니다.");
    }
    if(/[^가-힣a-zA-Z0-9,]/.test(input)){
      throw new Error("[ERROR] 중간에 쉼표(,) 이외의 다른 구분 기호를 사용하였습니다.");
    }
    
    // 자동차 이름 분리
    let carNames = input.split(",");

    for(let i = 0;i<carNames.length;i++){
      if(carNames[i].length>5){
        throw new Error("[ERROR] 자동차의 이름이 5자 초과입니다.");
      }

      if(carNames[i]===""){
        throw new Error("[ERROR] 자동차의 이름이 비어있습니다.");
      }
    }
    return carNames;
  };

  // 시도 횟수 검증
  validateRaceCount(raceCount){
    if(!Number(raceCount)){
      throw new Error("[ERROR] 숫자가 아닌 문자를 입력받았습니다.");
    }
    if(raceCount===""){
      throw new Error("[ERROR] 시도 횟수가 비어있습니다.");
    }
    if(Number(raceCount)<0){
      throw new Error("[ERROR] 0이하의 숫자를 입력하였습니다.");
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

  // 전진 함수 추가
  moveCar(carStates,name){
    carStates[name] += 1;
  }

  // 차 진행상황 출력 함수 추가
  printCarStates(carStates) {
    Object.entries(carStates).forEach(([name,position]) => {
      Console.print(`${name} : ${"-".repeat(position)}`);
    });
  }

  // 우승자 판단 함수 추가
  determineWinner(carStates){
    const maxPosition = Math.max(...Object.values(carStates));
    const winner = Object.keys(carStates).filter(
      (name) => carStates[name] === maxPosition);
    return winner;
    };
}

export default App;
