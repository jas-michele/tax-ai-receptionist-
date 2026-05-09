
type RefundInput = {
    income: number;
    dependents: number;
};

export function calculateRefund({
    income,
    dependents,
}: RefundInput) {

    const parsedIncome = Number(income);
    const parsedDependants = Number(dependents)

    let estimatedRefund = 0;

    estimatedRefund += parsedDependants * 2000;

    if (parsedIncome < 50000) {
        estimatedRefund += 1000;
    }

    return Math.ceil(estimatedRefund);
}