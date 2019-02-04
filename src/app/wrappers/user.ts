export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: number,
        lng: number
      }
    };
    phone: number;
    website: string;
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    };

    constructor( json ) {
      this.id = json['id'];
      this.name = json['name'];
      this.username = json['username'];
      this.email = json['email'];
      this.address = json['address'];
      this.phone = json['phone'];
      this.website = json['website'];
      this.company = json['company'];
    }
  }
