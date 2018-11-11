export function defineColor(votes) {
    if (votes > 2) {
        return 'green';
    } else if (votes >= 0 && votes <= 2) {
        return 'yellow';
    } else {
        return 'red';
    }
}
