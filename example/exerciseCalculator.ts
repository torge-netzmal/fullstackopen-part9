interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseResult => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
    const average = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
    const success = target <= average;
    const rating = (success ? 2 : 1) + (trainingDays === periodLength ? 1 : 0);

    let ratingDescription = '';
    switch (rating) {
        case 1:
            ratingDescription = 'You did not reach your training goals. Keep at it!';
            break;
        case 2:
            ratingDescription = 'Good job! Keep it up!';
            break;
        case 3:
            ratingDescription = 'Great job! You have reached your training goals and exercised every day!';
    }

    return {
        periodLength,
        trainingDays,
        target,
        average,
        success,
        rating,
        ratingDescription,
    };

}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));