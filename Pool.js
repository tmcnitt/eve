import Individual from './Individual'
import ProgressBar from 'progress'

export default class Pool {

	constructor(spectrum, answer, split = .50, mutate = .30, size = 50, tries = 1000) {

		this.split = split
		this.mutate = mutate
		this.size = size
		this.spectrum = spectrum.toString()
		this.answer = answer.toString()
		this.tries = tries
		this.generation = 0

		//Create inital pool
		this.create()
	}

	loop() {
		//Sort pool by fitness for split
		this.population.sort((a, b) => {
			return b.evaluate(this.answer) - a.evaluate(this.answer)
		})

		//The new mutated population
		let population = []

		if (this.population[0].fitness == 0) {
			console.warn("0 Fitness generation")
		}

		//What Individuals survive the cut
		let survived = this.population.slice(0, Math.ceil(this.population.length * this.split))

		//The outcome of crossover and mutation
		let breed = []

		//Breed together each pair that survived via two point cross over
		//Also mutate both outcomes based on ratio
		for (let i = 0; i < survived.length; i++) {
			let pivot = Math.floor(survived[i].length / 3)
			let next = this.roulette(survived)

			let child1 = new Individual(this.spectrum, this.answer.length)
			let child2 = new Individual(this.spectrum, this.answer.length)

			let genome1 = (survived[i].genome.slice(0, pivot) + next.genome.slice(pivot, pivot + pivot) + survived[i].genome.slice(pivot + pivot, survived[i].genome.length)).split(",")
			let genome2 = (next.genome.slice(0, pivot) + survived[i].genome.slice(pivot, pivot + pivot) + next.genome.slice(pivot + pivot, survived[i].genome.length)).split(",")

			child1.update(genome1)
			child2.update(genome2)

			//Mutate based on constant
			if (Math.random() <= this.mutate) {
				child1.mutate()
			}

			if (Math.random() <= this.mutate) {
				child2.mutate()
			}

			child1.evaluate(this.answer)
			child2.evaluate(this.answer)

			//Finally push onto new stack
			breed.push(child1)
			breed.push(child2)
		}

		this.population = breed

		let convert = []
		for (var i = 0; i < breed.length; i++) {
			convert.push(breed[i].convert())
		}

		console.log(convert)

		return this.population
	}

	solve() {
		let solved = false
		let history = []

		while (this.generation < this.tries && !solved) {

			let genomes = this.loop()

			console.log("generation " + this.generation + " \'" + genomes[0].convert() + "\' fitness: " + genomes[0].fitness)

			history.push(genomes[0])

			if (genomes[0].fitness == this.answer.length) {
				solved = true
			} else {
				this.generation++
			}
		}
	}

	roulette(pool) {
		//Get sum of fitness
		let sum = 0
		pool.forEach(value => {
			sum += value.fitness
		})

		//Sort by fitness
		pool.sort((a, b) => {
			return a.fitness - b.fitness
		})

		let probablity = []
		let previous = 0

		for (var i = 0; i < pool.length; i++) {
			let prob = previous + (pool[i].fitness / sum)
			previous = prob
			probablity.push(prob)
		}

		let goal = Math.random() * probablity.reduce((a, b) => a + b, 0);

		for (let i = 0; i < probablity.length; i++) {
			goal -= probablity[i]
			if (goal <= 0) return pool[i]
		}
	}

	create() {
		let population = []
		for (let i = 0; i < this.size; i++) {
			let ind = new Individual(this.spectrum, this.answer.length)
			ind.generate()
			population.push(ind)
		}

		this.population = population
	}
}