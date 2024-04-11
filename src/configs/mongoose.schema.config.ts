/**
 * @description Default schema options applied to all schema
 */
export default {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		currentTime: () => new Date(),
	},
	versionKey: false,
	suppressReservedKeysWarning: false,
	strictQuery: false,
	strictPopulate: false,
};
