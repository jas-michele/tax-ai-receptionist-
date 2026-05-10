import { intakeForms } from "../data/intakeData";

export function saveIntake(intake: any) {
    intakeForms.push(intake);
}

export function getAllIntakes() {
    return intakeForms;
}