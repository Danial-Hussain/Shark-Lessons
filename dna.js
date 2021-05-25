// Genes of the sharks
class DNA{
    constructor(genes, magnitude = 0.17){
        if (genes){
            this.genes = genes;
        }
        else{
            this.genes = [];
            for (let i = 0; i < lifespan; i++){
                let gene = p5.Vector.random2D();
                gene.setMag(magnitude);
                this.genes[i] = gene;
            }
        }
    }
}