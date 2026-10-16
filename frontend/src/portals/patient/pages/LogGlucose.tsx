import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { glucoseService } from '../../../services/glucoseService';
import { GlucoseContext } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

export const LogGlucose: React.FC = () => {
  const [value, setValue] = useState('');
  const [context, setContext] = useState<GlucoseContext>(GlucoseContext.FASTING);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await glucoseService.logReading({
        value: parseFloat(value),
        context,
      });
      navigate('/patient');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Log Blood Glucose</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Glucose Value (mmol/L)"
            type="number"
            step="0.1"
            placeholder="e.g. 6.5"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />

          <Select
            label="Context"
            value={context}
            onChange={(e) => setContext(e.target.value as GlucoseContext)}
            options={[
              { value: GlucoseContext.FASTING, label: 'Fasting' },
              { value: GlucoseContext.BEFORE_MEAL, label: 'Before Meal' },
              { value: GlucoseContext.AFTER_MEAL, label: 'After Meal' },
              { value: GlucoseContext.BEDTIME, label: 'Bedtime' },
              { value: GlucoseContext.RANDOM, label: 'Random' },
            ]}
          />

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Saving...' : 'Save Reading'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
