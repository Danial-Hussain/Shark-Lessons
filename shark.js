// Shark Agent
class Shark{
    constructor(xpos, ypos, genes, sharksize = 80){
        this.position = (xpos && ypos)
         ? createVector(xpos, ypos) 
         : createVector();
        this.velocity = createVector();
        this.acceleration = createVector();
        this.sharksize = sharksize;
        this.genes = genes
         ? genes
         : new DNA();
        this.fish_eaten = new Set();
        this.fitness = 0;
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    update(geneNumber){
        this.applyForce(this.genes.genes[geneNumber]);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.velocity.limit(3);
        this.intersectsfish();
    };

    show(){
        push();
        if (this.velocity.x > 0) {
            image(
                shark_r,
                this.position.x,
                this.position.y,
                this.sharksize,
                this.sharksize
            );
        } else{
            image(
                shark_l,
                this.position.x,
                this.position.y,
                this.sharksize,
                this.sharksize
            );
        }
        pop();
    }

    intersectsfish(){
        let fishFood = food_population.population;
        for (let i = 0; i < fishFood.length; i++){
            let d = dist(
                this.position.x,
                this.position.y, 
                fishFood[i].position.x, 
                fishFood[i].position.y
            );
            if (d <= 55 && !this.fish_eaten.has(fishFood[i].id)){
                this.fish_eaten.add(fishFood[i].id);
            }
        }
    }

    setFitness(){
        this.fitness = this.fish_eaten.size;
    }
}