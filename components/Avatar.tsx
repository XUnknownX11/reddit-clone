import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {
  seed?: string;
  large?: boolean;
};

function Avatar({ seed, large }: Props) {
  const { data: session } = useSession();
  return (
    <div
      className={`relative h-10 w-10 border-gray-300 rounded-full bg-white overflow-hidden ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || "paceholder"
        }.svg`}
      />
    </div>
  );
}

export default Avatar;
