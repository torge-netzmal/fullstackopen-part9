interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

interface ExerciseInput {
    dailyExerciseHours: number[];
    target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (!isNaN(Number(args[2]))) {
        const target = Number(args[2]);
        const dailyExerciseHours = [];

        for (let i = 3; i < args.length; i++) {
            const hours = Number(args[i]);
            if (!isNaN(hours)) {
                dailyExerciseHours.push(hours);
            } else {
                throw new Error('Provided values were not numbers!');
            }
        }

        return {
            dailyExerciseHours,
            target
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
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

try {
    const {dailyExerciseHours, target} = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}