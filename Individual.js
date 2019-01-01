export default class Individual {
    constructor(spectrum, size){
        this.genome = []
        this.spectrum = spectrum
        this.size = size
    }

    generate(){
        for(let i = 0; i < this.size; i++){
            this.genome.push(this.spectrum.charAt(Math.floor(Math.random() * this.spectrum.length)).charCodeAt())
        }
    }

    evaluate(correct){
        //Input types:
        //AAAAA - convert to array, convert to charCode
        //1234 - convert to array, convert to charCode
        //[1,2,3,4] - convert to charCode

        //Case 1 and Case 2
        if(!Array.isArray(correct)){
            if(typeof correct == 'number'){
                correct = correct.toString()
            }
            
            if(typeof correct == 'string'){
                correct = correct.split("").map(val => {
                    return val.charCodeAt()
                })
            }
        } else {
            //Case 3
            if(!isNaN(correct[0])){
                correct = correct.map(val => {
                    return val.toString().charCodeAt()
                })
            }
        }

        if(typeof correct != "object"){
            console.error("Incorrect type for Individual check", typeof correct)
        }

        let fitness = 0;
        this.genome.forEach( (val, i, array) => {
           if(val == correct[i]){
               fitness++
           }
        })

        this.fitness = fitness
        return fitness
    }

    mutate(){
       this.genome[Math.floor(Math.random() * (this.genome.length))] = this.spectrum.charAt(Math.floor(Math.random() * this.spectrum.length)).charCodeAt()
    }

    update(genome){
        this.genome = genome
    }

    convert(){
         return this.genome.map(val => {
            return String.fromCharCode(val)
        }).toString().replace(/,/g, "")
    }
}