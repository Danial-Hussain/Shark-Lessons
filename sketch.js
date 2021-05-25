// Genetic Algorithm Experimentation
// Objective- Teach sharks how to swim in circles
// Creator - Ali Danial Hussain

// Global Variables
let population;
let food_population;
let lifespan = 1000;
let counter = 0;
let sharkpop_size = 25;
let fishpop_size = 30;
let epochs = [0];
let avgfitness = [0];
let maxfitness = [0];
let fitnessChart;

// Chart Data
let data = {
  labels: epochs,
  datasets: [{
    label: 'Avg. Fitness',
    backgroundColor: '#ff9f43',
    borderColor: '#ff9f43',
    data: avgfitness,
  },{
    label: 'Max. Fitness',
    backgroundColor: '#feca57',
    borderColor: '#feca57',
    data: maxfitness,
  }]
};

// Configure Chart
let config = {
  type: 'line',
  data,
  color: '#ffffff',
  options: { 
    plugins: {
      title: {
          display: true,
          fontSize: 50,
          text: 'Fitness over Epochs'
      }
    }
  }
};

// Static Files
function preload() {
  shark_r = loadImage("images/sharktype1-right.png");
  shark_l = loadImage("images/sharktype1-left.png");
  fish_r = loadImage("images/fish_r.png");
  fish_l = loadImage("images/fish_l.png");
}

// Preprocess
function setup() {
  createCanvas(1900, 740);
  population = new Population(sharkpop_size);
  food_population = new FoodPopulation(fishpop_size);
  fitnessChart = new Chart(
    document.getElementById('fitnessChart'),
    config
  );
}

// Infinite Loop
function draw() {
  background('#006994');
  fill('#ffffff');
  if (counter === lifespan){
    counter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
    population.mutation();
    population.reset();
    epochs.push(epochs[epochs.length-1] + 1);
    avgfitness.push(population.avgfitness);
    maxfitness.push(population.maxfitness);
    fitnessChart.update();
  }
  population.run(counter);
  food_population.run();
  counter += 1;
}
