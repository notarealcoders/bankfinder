import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const IFSCInfo = () => {
  const features = [
    "Unique Identification: Each bank branch has a distinct IFSC code",
    "Electronic Transactions: Used for secure fund transfers",
    "11-Digit Code: Combines letters and numbers",
    "Regulated by RBI: Overseen by Reserve Bank of India",
    "Online Banking: Essential for NEFT, RTGS, and IMPS",
    "Location Specific: Uniquely identifies specific branches",
    "Swift Fund Transfers: Ensures error-free transactions",
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <BookOpen className="w-5 h-5 mt-1 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Understanding IFSC</h3>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            IFSC (Indian Financial System Code) is a unique identification code
            for bank branches in India, essential for electronic fund transfers
            and online banking operations.
          </p>

          <div className="space-y-2">
            <h4 className="font-medium">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IFSCInfo;
