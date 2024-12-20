import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const BankMap = ({ address, city, state }) => {
  const encodedAddress = encodeURIComponent(`${address}, ${city}, ${state}`);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <MapPin className="h-4 w-4" />
        <CardTitle>Branch Location</CardTitle>
      </CardHeader>
      <CardContent>
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </CardContent>
    </Card>
  );
};
export default BankMap;
