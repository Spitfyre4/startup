import React from 'react';
import { useParams } from 'react-router-dom';

export function Workout() {
  const { id } = useParams();

  return <main className="workout-background">Workout {id}</main>;
}