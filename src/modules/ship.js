function Ship(length){
    this.length = length;
    let hitCount = 0;

    const isHit = ()=>{
        hitCount += 1;
    }

    const isSunk = ()=>{
        if(hitCount >= length){
            return true;
        }
        return false;
    }

    return{length, hitCount, isHit, isSunk}
}

module.exports = Ship;