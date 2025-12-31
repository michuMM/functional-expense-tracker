type Props = {
  size: number;
  onChange: (value: number) => void;
};

export const ChartSizeSlider = ({ size, onChange }: Props) => (
  <div style={{ margin: "1rem 0" }}>
    <label>
      Rozmiar wykresu: <strong>{size}px</strong>
    </label>
    <br />
    <input
      type="range"
      min={200}
      max={500}
      step={10}
      value={size}
      onChange={e => onChange(Number(e.target.value))}
    />
  </div>
);
