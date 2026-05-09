type IntakeData = {
    name: string;
    phone: string;
    income: number;
    dependents: number;
};

const intakes: IntakeData[] = [];

export function saveIntake(
    intakeData: IntakeData
) {
    intakes.push(intakeData);

    return intakeData;
}