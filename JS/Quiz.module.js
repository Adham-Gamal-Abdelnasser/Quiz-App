export class Quiz {
  constructor(category, difficulty, qNumber) {
    this.category = category;
    this.difficulty = difficulty;
    this.qNumber = qNumber;
    this.score = 0;
  }

  async getQuestionsFromApi() {
    const api = await fetch(
      `https://opentdb.com/api.php?amount=${this.qNumber}&category=${this.category}&difficulty=${this.difficulty}`
    );
    const apiResponse = await api.json();
    return apiResponse.results;
  }

  showResult() {
    return `
            <div class="question w-100 d-flex flex-column">
                <h2 class="mb-3 mx-auto">${
                  this.score == this.qNumber
                    ? `Congratulations  &#127881;`
                    : `Your Score Is ${this.score}`
                }</h2>
                <button id="again" class="p-1 btn-primary rounded-pill"><i class="fas fa-retweet"></i> Try Again</button>
            </div>
        
        `;
  }
}
