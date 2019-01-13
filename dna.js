let cost = 2;
function shuffleArr(arr) {
    var currentI = arr.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentI) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentI);
      currentI -= 1;
  
      // And swap it with the current element.
      temporaryValue = arr[currentI];
      arr[currentI] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
  
    return arr;
}
function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

class DNA{
    constructor(citiesIn){
        this.citiesUse = [];
        this.genes = new Array(citiesIn.length);
        this.fitness = 0;
        this.lineValues = [];
        this.distanceApart = 0;
        for(let i = 0; i < citiesIn.length; i++){
            this.citiesUse.push(i);
        }
        this.genes = shuffleArr(this.citiesUse);

    }

    calcFitness(){
        let totalTravelDistance = 0;
        let minDistance = 500;
        let maxDistance = 0;

        for(let i = 0; i < this.genes.length - 1; i++){

                let city1, city2;
                city1 = cities[this.genes[i]];
                city2 = cities[this.genes[i + 1]];

                this.lineValues = [city1.x, city1.y, city2.x, city2.y];
                fill(100);
                stroke(100);
                line(city1.x, city1.y, city2.x, city2.y);
                let distance = int(dist(city1.x, city1.y, city2.x, city2.y));
                if(distance > maxDistance) maxDistance = distance;
                if(minDistance === 0) minDistance = distance;
                if(distance < minDistance) minDistance = distance;

                totalTravelDistance += distance;
        }
        this.distanceApart = totalTravelDistance;

        totalTravelDistance = totalTravelDistance / 10;
        this.fitness = 1 / (pow(totalTravelDistance, 8) + 1);
    }
    normalizeFitness(totalFitness){
          this.fitness = this.fitness / totalFitness;
          this.fitness *= 100;
    }
    crossOver(partner){
        let Child = new DNA(cities);

        let partStart = floor(random(this.genes.length));
        let partEnd = floor(random(partStart + 1, this.genes.length));
        let newOrder = this.genes.slice(partStart, partEnd);
        for(let i = 0; i < partner.genes.length; i++){
            if(!newOrder.includes(partner.genes[i])){
                newOrder.push(partner.genes[i]);
            }
        }
        Child.genes = newOrder;
        return Child;
    }
    mutate(rate){
        for(let i = 0; i < this.genes.length; i++){
            if(random(0,1) < rate){

                let numberSwapped = floor(random(this.genes.length));
                // Swap           
                let tmp = this.genes[i];
                this.genes[i] = this.genes[numberSwapped];
                this.genes[numberSwapped] = tmp;

            }
        }
    }
}