// contants
export const CONST = {
    YES: "YES",
    NO: "NO"
}

var domain = process.env.DOMAIN || 'https://udacity-reads.herokuapp.com';
export const API_ENDPOINT = {
    READABLE_STARTER: domain
}

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export default token;
