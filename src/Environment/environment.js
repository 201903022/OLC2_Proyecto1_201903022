export class Environment{ 
    /**
     * @param {Environment} before
     */

    constructor( before = undefined) { 
        this.before = before; 
        this.variables = {};
    }

    /**
     * @param {string} id
     * @param {any} value
     */
    setVariable(name,value){
        this.variables[name] = value;
        
    }

    /**
     * @param {string} id
     */

    getVariable(name) { 
        const cuurrentValue = this.variables[name]; 
        if (cuurrentValue) {
            return cuurrentValue;
        }

        if (!cuurrentValue && this.before) { 
            return this.before.getVariable(name);            
        }

        throw new Error(`Variable ${name} undefined`)
    }

    /**
     * @param {string} id
     */
    hasVariable(name) { 
        return this.variables[name] !== undefined;
        }

    assignVariable(name,value) { 
        const cuurrentValue = this.variables[name]; 
        if (cuurrentValue) {
            this.variables[name] = value;
            return;
        }

        if (!cuurrentValue && this.before) { 
            this.before.assignVariable(name,value);            
            return;
        }

        throw new Error(`Variable ${name} undefined`)
    }
        
}