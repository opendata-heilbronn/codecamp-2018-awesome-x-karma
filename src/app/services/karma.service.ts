import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KarmaService {
  constructor() {}

  kmScale(product: any): number {
    let score = 0;
    if (product.distance === null) {
      return null;
    }
    if (product.distance <= 30) {
      score = 40;
    } else if (product.distance <= 50) {
      score = 30;
    } else if (product.distance <= 80) {
      score = 20;
    } else if (product.distance <= 150) {
      score = 10;
    } else if (product.distance <= 300) {
      score = 3;
    }
    return score;
  }

  haltung(product: any): number {
    let score = 0;
    if (product.haltung === null) {
      return null;
    }
    if (product.haltung === 'bio') {
      score = 50;
    } else if (product.haltung === 'freiland') {
      score = 25;
    } else if (product.haltung === 'fairtrade') {
      score = 40;
    }
  }

  co2Scale(product: any): number {
      let score = 0;
      if (product.co2 === null) {
          return null;
      }
      if (product.co2 <= 50) {
          score = 40;
      } else if (product.co2 <= 150) {
          score = 30;
      } else if (product.co2 <= 500) {
          score = 20;
      } else if (product.co2 <= 1000) {
          score = 10;
      } else if (product.co2 <= 1500) {
          score = 3;
      }
      return score
  }

  haltungScale(product: any): number {
      let score = 0;
      if (product.haltung === null) {
          return null;
      }
      if (product.haltung === "bio") {
          score = 50;
      } else if (product.haltung === "freiland") {
          score = 25;
      } else if (product.haltung === "fairtrade") {
          score = 40;
      }
      return score
  }

  spaceScale(product: any): number {
      let score = 0;
      if (product.platz === null) {
          return null;
      }
      if (product.platz >= 5 ) {
          score = 50;
      } else if (product.platz >= 3) {
          score = 25;
      } else if (product.platz >= 1) {
          score = 4;
      }
      return score
  }

  GetKarma(product: any): number {
    let score: number = 0;
    if (product.category === "o") {
        score += this.kmScale(product)
        score += this.haltungScale(product)
        score += this.co2Scale(product)
    } else if (product.category === "t") {
        score += this.kmScale(product)
        score += this.haltungScale(product)
        score += this.co2Scale(product)
        score += this.spaceScale(product)
    }
    return score;
  }
}
