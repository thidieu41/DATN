import React from 'react'
import { createClient } from 'src/utils/axios'

const client = createClient()

export const Schedule = {
	Add:async (date, quantity, reason) => {
		const response = await client.post(
			"/app/bookings/",
			{
				date, quantity, reason
			}
		)
		return response
	}
}
