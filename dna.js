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
        for(let i = 0; i < citiesIn.length; i++){
            this.citiesUse.push(i);
        }
        this.genes = shuffleArr(this.citiesUse);

    }

    calcFitness(){
        let totalTravelDistance = 0;
        let score = 0;
        let minDistance = 100000;
        let maxDistance = 0;

        for(let i = 0; i < this.genes.length; i++){
            if(i + 1 < this.genes.length){
                let x1, x2, y1, y2;
                x1 = cities[this.genes[i]].x;
                x2 = cities[this.genes[i + 1]].x;
                y1 = cities[this.genes[i]].y;
                y2 = cities[this.genes[i + 1]].y;

                this.lineValues = [x1, y1, x2, y2];
                fill(100);
                stroke(100);
                line(x1, y1, x2, y2);
                let distance = int(dist(x1, x2, y1, y2));
                if(distance > maxDistance) maxDistance = distance;
                if(distance < minDistance) minDistance = distance;
                totalTravelDistance += distance;
            }
        }

        score = totalTravelDistance * - 1;
        score = floor(convertRange( score, [ minDistance, maxDistance ], [ 0, 1 ] ));
        score += 23;
        this.fitness = score;
    }
    crossOver(partner){
        let Child = new DNA(cities);
        let midPoint = floor(random(this.genes.length));
        for(let i = 0; i < this.genes.length; i++){
            if(i < midPoint) Child.genes[i] = this.genes[i];
            else Child.genes[i] = partner.genes[i];
        }
        return Child;
    }
    mutate(rate){
        for(let i = 0; i < this.genes.length; i++){
            if(Math.random() < rate){
                this.totalMutations += 1;
                this.genes[i] = floor(random(this.genes.length));
            }
        }
    }
}