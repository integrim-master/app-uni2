interface MembershipData {
  name: string;
  id: number;
  benefits: Benefits[];
 
}


interface  Benefits {
    title: string;
    id: number;
    description: string;
    precio: number;
    image: string;
    allowed: number;
    used: number;
    remaining: number;
    period: string;
  }

export {
  Benefits, MembershipData
};

