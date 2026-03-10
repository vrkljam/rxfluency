const CircularProgress = ({ current, total, size = 80 }) => {
  const radius = 36;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.round((current / total) * 100);
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="d-flex justify-content-center align-items-center">
      <svg height={size} width={size}>
        {/* Background circle */}
        <circle
          stroke="#e9ecef"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress circle */}
        <circle
          stroke="#0d6efd" // Bootstrap primary
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.35s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />

        {/* Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fw-bold"
        >
          {percent}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
