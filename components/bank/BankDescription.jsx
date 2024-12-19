import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

const BankDescription = ({ bank }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-5 h-5 mt-1 text-muted-foreground" />
          <h3 className="font-semibold text-lg">About This Branch</h3>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>
            This is a{" "}
            <span className="text-lg font-semibold text-gray-800">
              {bank.BANK}
            </span>{" "}
            branch located in{" "}
            <span className="text-lg font-semibold text-gray-800">
              {bank.CITY1}{" "}
            </span>
            ,{" "}
            <span className="text-lg font-semibold text-gray-800">
              {bank.STATE}{" "}
            </span>
            . The branch operates under the unique IFSC code {bank.IFSC}, which
            is essential for all banking transactions.
          </p>

          <p>
            IFSC (Indian Financial System Code) is a unique 11-character code
            that identifies a specific bank branch in India. It's crucial for
            facilitating electronic funds transfers through NEFT, RTGS, and IMPS
            systems.
          </p>

          <div className="mt-6">
            <h4 className="font-medium text-foreground mb-2">
              Code Breakdown:
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                First 4 characters{" "}
                <span className="text-lg font-semibold text-gray-800">
                  ({bank.IFSC.slice(0, 4)}){" "}
                </span>
                : Bank identifier
              </li>
              <li>5th character (0): Reserved for future use</li>
              <li>
                Last 6 characters{" "}
                <span className="text-lg font-semibold text-gray-800">
                  ({bank.IFSC.slice(5)}){" "}
                </span>
                : Branch identifier
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-foreground mb-2">
              Services Available:
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>NEFT (National Electronic Funds Transfer)</li>
              <li>RTGS (Real Time Gross Settlement)</li>
              <li>IMPS (Immediate Payment Service)</li>
              <li>Regular banking services</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankDescription;
