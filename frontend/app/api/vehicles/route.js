export default function GET(req, res) {
  res.status(200).json([
    { id: 1, type: "Mobil" },
    { id: 2, type: "Motor" },
    { id: 3, type: "Truk" },
  ]);
}
