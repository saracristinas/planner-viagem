import { Trip } from '@prisma/client';

export class TripResponseDto {
  id: number;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number | null;
  emergencyFund: number;
  usedEmergencyFund: number;

  constructor(trip: Trip) {
    this.id = trip.id;
    this.title = trip.title;
    this.destination = trip.destination;
    this.startDate = trip.startDate;
    this.endDate = trip.endDate;
    this.budget = trip.budget;
    this.emergencyFund = trip.emergencyFund;
    this.usedEmergencyFund = trip.usedEmergencyFund;
  }
}