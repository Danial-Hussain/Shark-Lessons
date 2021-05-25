// Controls the sharks
class Population {
    constructor(count, spawnlocation){
        this.population = [];
        this.spawn = createVector(300, 325)
        this.matingPool = [];
        this.mutationRate = 0.01;
        this.avgfitness = 0;
        this.maxfitness = 0;
        for (let i = 0; i < count; i++){
            this.population[i] = new Shark(
                this.spawn.x,
                this.spawn.y
            );
        }
    }

    run(gene_index){
        for (let i = 0; i < this.population.length; i++){
            this.population[i].update(gene_index);
            this.population[i].show();
        }
    }

    // Reset
    reset(){
        for (let i = 0; i < this.population.length; i++){
            this.population[i].fish_eaten.clear();
            this.population[i].velocity = createVector();
            this.population[i].position = createVector(this.spawn.x, this.spawn.y);
        }
    }

    // Calculate fitness metric - # fish consumed
    fitness(){
        let maxFitness = 0;
        let summation = 0;
        for (let i = 0; i < this.population.length; i++){
            this.population[i].setFitness();
            maxFitness = Math.max(this.population[i].fitness, maxFitness);
            summation += this.population[i].fitness;
        }
        this.maxfitness = maxFitness;
        this.avgfitness = summation / this.population.length;
        // Normalize
        for (let i = 0; i < this.population.length; i++){
            this.population[i].fitness /= maxFitness;
        }
    }

    // Create mating pool based on ranking algorithm
    selection(){
        this.matingPool = [];
        for (let i = 0; i < this.population.length; i++){
            let n = this.population[i].fitness * 100;
            for (let j = 0; j < n; j++){
                this.matingPool.push(this.population[i]);
            }
        }
    }

    // Reproduction process
    reproduction(){
        let newpopulation = [];
        for (let i = 0; i < this.population.length; i++){
            let parentA = random(this.matingPool).genes;
            let parentB = random(this.matingPool).genes;
            let child = this.crossover(parentA, parentB);
            newpopulation[i] = new Shark(
                this.spawn.x,
                this.spawn.y,
                child
            );
        }
        this.population = newpopulation;
    }

    // Genetic crossover
    crossover(shark1, shark2){
        let newDNA = [];
        let mid = floor(random(shark1.genes));
        for (let i = 0; i < shark1.genes.length; i++){
            if (i > mid){
                newDNA[i] = shark1.genes[i];
            }
            else{
                newDNA[i] = shark2.genes[i];
            }
        }
        return new DNA(newDNA);
    }

    // Mutation - Prevents early algorithmic convergence & Keep Biodiversity
    mutation(){
        for (let i = 0; i < this.population.length; i++){
            for (let j = 0; j < this.population[i].genes.genes.length; j++){
                if (random(1) < this.mutationRate){
                    this.population[i].genes.genes[j] = p5.Vector.random2D().setMag(0.17);
                }
            }
        }
    }
}