export class BreaKException extends error{ 
    constructor(){
        super('BreakException');
    }
}

export class ContinueException extends error{ 
    constructor(){
        super('ContinueException');
    }
}

export class ReturnException extends error{ 
    constructor(value){
        super('ReturnException');
        this.value = value;
    }
}
