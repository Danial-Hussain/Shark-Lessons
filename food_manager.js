// Controls the food
class FoodPopulation{
    constructor(count){
        this.population = [];
        let id = 1;
        let x = 950;
        let y = 340;
        let radius = 340;
        for (let i = 0; i < 360; i += (360 / count)){
            let angle = i;
            let x1 = radius * Math.cos(angle * Math.PI / 180);
            let y1 = radius * Math.sin(angle * Math.PI / 180);
            this.population.push(
                new Food(createVector(x + x1, y + y1), id)
            );
            id += 1;
        }
    }

    run(){
        for (let i = 0; i < this.population.length; i++){
            this.population[i].update();
            this.population[i].show();
        }
    }
}