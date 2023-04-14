const prevNum = document.querySelector<HTMLDivElement>(".prevNum")!;
const currentNum = document.querySelector<HTMLDivElement>(".currentNum")!;

interface Operators {
  [key: string]: (prev: number, current: number) => number;
}

class Calculator {
  private defaultCurrentNum: string = "0";
  private prevNumEl: HTMLDivElement;
  private currentNumEl: HTMLDivElement;
  private isUpdatePrevNum: boolean = false;
  private isCalculated: boolean = false;
  private operator: string = "";
  private prevNum: string = "";
  private currentNum: string = this.defaultCurrentNum;

  constructor(prevNumEl: HTMLDivElement, currentNumEl: HTMLDivElement) {
    this.prevNumEl = prevNumEl;
    this.currentNumEl = currentNumEl;
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  private clear(): void {
    this.currentNum = this.defaultCurrentNum;
    this.prevNum = "";
    this.currentNumEl.innerText = this.currentNum;
    this.prevNumEl.innerText = this.prevNum;
    this.operator = "";
    this.isCalculated = false;
  }

  private clearEntry(): void {}

  private updateCurrentNum(num: string): void {
    if (this.isCalculated) {
      this.clear();
    }
    if (num === "." && this.currentNumEl.innerText.includes(".")) {
      return;
    }

    if (
      (this.currentNumEl.innerText === this.defaultCurrentNum ||
        this.isUpdatePrevNum) &&
      num !== "."
    ) {
      this.currentNum = num;
    } else {
      this.currentNum += num;
    }

    this.currentNumEl.innerText = this.formatNumber(parseInt(this.currentNum));
  }

  private updatePrevNum(operator: string): void {
    this.operator = operator;
    this.prevNum = this.currentNum;
    this.prevNumEl.innerText = `${this.prevNum} ${operator}`;
    this.isUpdatePrevNum = true;
  }

  private calculate(): void {
    const operators: Operators = {
      "+": (prev, current) => prev + current,
      "-": (prev, current) => prev - current,
      "×": (prev, current) => prev * current,
      "%": (prev, current) => prev / current,
    };
    // after calculate
    this.prevNumEl.innerText = `${this.prevNum} ${this.operator} ${this.currentNum} =`;

    this.currentNumEl.innerText = this.formatNumber(
      operators[this.operator](
        parseInt(this.prevNum),
        parseInt(this.currentNum)
      )
    );
    this.prevNum = this.currentNumEl.innerText;
    this.isCalculated = true;
  }

  public init(): void {
    const numbers = document.querySelectorAll<HTMLDivElement>(".numbers");
    const operators = document.querySelectorAll<HTMLDivElement>(".operators");
    const clears = document.querySelectorAll<HTMLDivElement>(".clears");

    numbers.forEach((numberEl) => {
      numberEl.addEventListener("click", () => {
        calculator.updateCurrentNum(numberEl.innerText);
      });
    });

    operators.forEach((operatorEl) => {
      operatorEl.addEventListener("click", () => {
        if (operatorEl.innerText === "=") {
          calculator.calculate();
          return;
        }
        calculator.updatePrevNum(operatorEl.innerText);
      });
    });

    clears.forEach((clearEl) => {
      clearEl.addEventListener("click", () => {
        if (clearEl.innerText === "C") {
          calculator.clear();
        } else {
          calculator.clearEntry();
        }
      });
    });
  }
}

const calculator = new Calculator(prevNum, currentNum);

calculator.init();
