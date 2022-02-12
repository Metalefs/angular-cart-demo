import * as moment from 'moment';

String.prototype.setDateFormat = function():string {
    const day = `${this[0]}${this[1]}`;
    const month = Number(`${this[2]}${this[3]}`).toString();
    const year = `${this[4]}${this[5]}${this[6]}${this[7]}`;

    if(isValidDate(day,month,year)){
        return new Date(`${year}/${month}/${day}`).toISOString();
    }

    else throw `Valor: ${day||0}/${month||0}/${year||0} não é uma data valida.`;
}

String.prototype.capitalize = function (): string {
    return this[0].toUpperCase() + this.substr(1).toLowerCase()
};

function isValidDate(day: string,month: string,year: string){
    if(testDateParts(day,month,year)){
        const date = moment(new Date(`${year}/${month}/${day}`));
        return date.isSameOrBefore();
    }
    return false;
}

function testDateParts(day: string,month: string,year: string){
    const today = new Date();
    const validDay = (parseInt(day) < 32 && parseInt(day) > 0),
        validMonth = (parseInt(month) < 13 && parseInt(month) > 0),
        validYear = (parseInt(year) > 0 && parseInt(year) <= today.getFullYear());
    return validDay && validMonth && validYear;
}

String.prototype.isIsoString = function(date:string):boolean {
    return date.includes("T");
}
String.prototype.hasSlash = function(date:string):boolean {
    return date.includes("/");
}

String.prototype.removeSlashes = function(date:string):string {
    return date.replace("/","").replace("/","");
}

String.prototype.toLocaleDateStringPtBR = function (date: string): string {
    return date?new Date(date).toLocaleDateString('pt-BR'):''
};
