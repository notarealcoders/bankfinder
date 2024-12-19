import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Building, Globe } from "lucide-react";

const BankDetailCard = ({ detail }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {detail.BANK}
        </CardTitle>
        <p className="text-sm text-muted-foreground">IFSC: {detail.IFSC}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Building className="w-5 h-5 mt-1 text-muted-foreground" />
          <div>
            <h3 className="font-semibold">Branch</h3>
            <p>{detail.BRANCH}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
          <div>
            <h3 className="font-semibold">Address</h3>
            <p>{detail.ADDRESS}</p>
            <p className="mt-1">
              {detail.CITY1}
              {detail.CITY2 && `, ${detail.CITY2}`}, {detail.STATE}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 mt-1 text-muted-foreground" />
          <div>
            <h3 className="font-semibold">Contact</h3>
            <p>
              {detail["STD CODE"] && `+91 ${detail["STD CODE"]} `}
              {detail.PHONE || "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankDetailCard;
