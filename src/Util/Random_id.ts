export function Random_id():string{
    var random_text:string = "12344448798348932ABCXVXsafsdffduiyiewsdb";
    var id = ""
    for(var i = 0; i<=random_text.length; i++){
        id+= random_text[Math.floor(Math.random() * random_text.length)]
    }
    return id;
}
console.log(Random_id());
