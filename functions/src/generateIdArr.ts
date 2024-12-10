
export default function generateIdArr(year: number, week: number): string[] {
    const baseWeekIds = [
        "Mo0610", "Mo1014", "Mo1418", "Mo1822",
        "Tu0610", "Tu1014", "Tu1418", "Tu1822",
        "We0610", "We1014", "We1418", "We1822",
        "Th0610", "Th1014", "Th1418", "Th1822",
        "Fr0610", "Fr1014", "Fr1418", "Fr1822",
        "Sa0610", "Sa1014", "Sa1418", "Sa1822",
        "Su0610", "Su1014", "Su1418", "Su1822"];

    const datedIds: string[] = [];
    baseWeekIds.forEach((id) => {
        datedIds.push(`${year.toString().slice(-2)}${week.toString()}${id}`);
    });

    const finishedIds: string[] = [];
    let rowCounter = 0;
    for (let i = 0; i < datedIds.length; i++) {
        if (rowCounter >= 4) {
            rowCounter = 0;
        }
        const rowIndex = rowCounter;
        const colIndex = Math.floor(i / 4);
        rowCounter++;

        finishedIds.push(`${rowIndex}${colIndex}${datedIds[i]}`);
    }

    return finishedIds;
}
