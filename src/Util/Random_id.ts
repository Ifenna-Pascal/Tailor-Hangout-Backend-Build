export function Random_id(): string {
  const random_text = '12344448798348932ABCXVXsafsdffduiyiewsdb';
  let id = '';
  for (let i = 0; i <= random_text.length; i++) {
    id += random_text[Math.floor(Math.random() * random_text.length)];
  }
  return id;
}
console.log(Random_id());
