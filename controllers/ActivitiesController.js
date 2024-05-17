import Activity from '../models/ActivitiesModel.js';

// Función para crear una nueva actividad
async function createActivityWithDetails(activityData) {
    try {
        const activity = new Activity(activityData);
        const savedActivity = await activity.save();
        return savedActivity;
    } catch (error) {
        throw error;
    }
}

// Crear actividad para CEIP Ciudad de Los Ángeles
async function createActivityForCiudadDeLosAngeles() {
    try {
        const categoryIds = ['663cbadad39ea1d39f199577', '664273245517263a7606c889', '664273855517263a7606c88a', '664273ee900bb91b71cf8797', '6642741a900bb91b71cf8799', '6642742a900bb91b71cf879b', '6642747e900bb91b71cf879f', '664274de900bb91b71cf87a3', '66427511900bb91b71cf87a5', '664275a9900bb91b71cf87a7', '664275bd900bb91b71cf87a9', '664275d5900bb91b71cf87ab', '664275e8900bb91b71cf87ad', '6642760c900bb91b71cf87af', '66427627900bb91b71cf87b1', '6642764c900bb91b71cf87b3'];
        const centerIds = ['66425f5c7c184be5f79d926d'];

        const activityData = {
            activity: 'Fútbol Sala',
            categories: categoryIds,
            centers: [centerIds[0]]
        };

        const savedActivity = await createActivityWithDetails(activityData);
        console.log('Actividad de Fútbol Sala para CEIP Ciudad de Los Ángeles creada exitosamente');
        return savedActivity;
    } catch (error) {
        console.error('Error al crear actividad para CEIP Ciudad de Los Ángeles:', error);
        throw error;
    }
}

// Crear actividad para CEIP Barcelona
async function createActivityForBarcelona() {
    try {
        const categoryIds = ['664273245517263a7606c889', '664273855517263a7606c88a', '6642760c900bb91b71cf87af', '66427627900bb91b71cf87b1'];
        const centerIds = ['66425f6bf84935852fd2675a'];

        const activityData = {
            activity: 'Fútbol Sala',
            categories: [categoryIds[1]], // ID de la categoría "Prebenjamín"
            centers: [centerIds[0]]
        };

        const savedActivity = await createActivityWithDetails(activityData);
        console.log('Actividad de Fútbol Sala para CEIP Barcelona creada exitosamente');
        return savedActivity;
    } catch (error) {
        console.error('Error al crear actividad para CEIP Barcelona:', error);
        throw error;
    }
}

// Crear actividad para IES Ciudad de Los Ángeles
async function createActivityForIesCiudadDeLosAngeles() {
    try {
        const categoryIds = ['663cbadad39ea1d39f199577', /* Inserta aquí los IDs de las categorías restantes */];
        const centerIds = ['66425f90f84935852fd2675b'];

        const activityData = {
            activity: 'Voleybol',
            categories: categoryIds,
            centers: [centerIds[0]]
        };

        const savedActivity = await createActivityWithDetails(activityData);
        console.log('Actividad de Fútbol Sala para IES Ciudad de Los Ángeles creada exitosamente');
        return savedActivity;
    } catch (error) {
        console.error('Error al crear actividad para IES Ciudad de Los Ángeles:', error);
        throw error;
    }
}

export { createActivityWithDetails, createActivityForCiudadDeLosAngeles, createActivityForBarcelona, createActivityForIesCiudadDeLosAngeles };