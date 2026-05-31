class Student {
    constructor(name,score){
        this.name = name;
        this.score = score;
    }
    Average(){
        let sum = 0;
        let len = this.score.length;
        for(let i = 0 ; i < len ; i++){
            sum += this.score[i];
        }
        return sum/len;
    }
    Grade(){
        let avg = this.Average();
        if(avg >= 90) return "A";
        if(avg >= 80) return "B";
        if(avg >= 70) return "C";
        if(avg >= 60) return "D";
        if(avg < 60) return "F";
    }
    Summary(){
        let mn = this.score[0];
        let mx = this.score[0];
        let len = this.score.length;
        for(let i = 0 ; i < len ; i++){
            if(this.score[i] > mx) mx = this.score[i];
            if(this.score[i] < mn) mn = this.score[i];
        }
        return {mn, mx};
    }
    getRemark(grade){
        switch(grade){
            case "A": return "Excellent";
            case "B": return "Good";
            case "C": return "Average";
            case "D": return "Improvement needed";
            case "F": return "Failed";
        }
    }
    printReportCard(){
        const avg = this.Average();
        const grade = this.Grade();
        const summary = this.Summary();
        console.log(`Name: ${this.name}`);
        console.log(`Scores: ${this.score.join(", ")}`);
        console.log(`Average Score: ${avg.toFixed(1)}`);
        console.log(`Grade: ${grade}`);
        console.log(`Highest Score: ${summary.mx}`);
        console.log(`Lowest Score: ${summary.mn}`);
        console.log(`Result : ${avg >= 60 ? "Pass" : "Fail"}`);
        console.log(`Remark: ${this.getRemark(grade)}`);
        const [score1, score2, ...rem] = this.score;
        console.log(`First Score : ${score1}`);
        console.log(`Second Score : ${score2}`);
        console.log(`Remaining Scores : ${rem}`);
    }
}


let argv = process.argv.slice(2);
if(argv.length < 4){
    console.log("Error: Please provide at least four arguments (name and three scores).");
    process.exit(1);
}
let name = argv[0];
let scores = argv.slice(1).map(Number);
const student = new Student(name, scores);
student.printReportCard();

