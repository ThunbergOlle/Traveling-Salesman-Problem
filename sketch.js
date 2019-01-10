
let totalPopulation = 5;
let riskOfMutation = 0.03;

let matingPool = [];
let cities = [];
let population = [];
let leadingDNA;

let averageFitness = 0;
let highestFitness = 0;
let generations = 0;

function setup() {
	createCanvas(500, 500);
	background(51);
	// Initialize routes

	for(let i = 0; i < 10; i++){
		cities.push({x: random(width), y: random(height), order: i});
	}
	for(let i = 0; i < totalPopulation; i++){
		population.push(new DNA(cities));
	}
}

function draw() {
	background(51);
	frameRate(1);
	strokeWeight(1)
	for(let city of cities){
        fill(255);
        stroke(255);
		let name = text(city.order, city.x, city.y - 20);
		name.textAlign(CENTER);
		fill(100);
		stroke(100);
		ellipse(city.x, city.y, 10);
	}
	let totalFitness = 0;
	for(let i = 0; i < population.length; i++){
		population[i].calcFitness();
		totalFitness += population[i].fitness;
		if(population[i].fitness >= highestFitness){
			highestFitness = population[i].fitness;
			console.log("Higher fitness found: " + population[i].fitness);
			console.log("DNA: " + JSON.stringify(population[i]));
			leadingDNA = population[i];
			console.log(leadingDNA);

		}
	}
	averageFitness = totalFitness / population.length;
	matingPool = [];
	// Push into matingPool
	for(let i = 0; i < population.length; i++){
		let element = Math.floor(population[i].fitness / 100);
		for (let x = 0; x < element; x++) {
			matingPool.push(population[i]);
		}
	}
	generations++;

	// Mating part
	for(let i = 0; i < population.length; i++){
		let p1 = floor(random(matingPool.length));
		let p2 = floor(random(matingPool.length));
		
		parentA = matingPool[p1];
		parentB = matingPool[p2];

		let newChild = parentA.crossOver(parentB);
		newChild.mutate(riskOfMutation);
		population[i] = newChild;

	}
	if(leadingDNA){
        for(let i = 0; i < leadingDNA.genes.length; i++){
            if(i + 1 < leadingDNA.genes.length){
                let x1, x2, y1, y2;
                x1 = cities[leadingDNA.genes[i]].x;
                x2 = cities[leadingDNA.genes[i + 1]].x;
                y1 = cities[leadingDNA.genes[i]].y;
				y2 = cities[leadingDNA.genes[i + 1]].y;
				strokeWeight(0.5);
				text(leadingDNA.distanceApart.toString(), 50, 50);

                fill(color('#00ff00'));
				stroke(color('#00ff00'));
				strokeWeight(5);
                line(x1, y1, x2, y2);
            }
        }
	}
	
	strokeWeight(1);
	text(floor(averageFitness), 10, 10);
}