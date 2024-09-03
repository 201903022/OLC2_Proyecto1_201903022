export class BreaKException extends Error{ 
    constructor(){
        super('BreakException');
    }
}

export class ContinueException extends Error{ 
    constructor(){
        super('ContinueException');
    }
}

export class ReturnException extends Error{ 
    constructor(value){
        super('ReturnException');
        this.value = value;
    }
}
