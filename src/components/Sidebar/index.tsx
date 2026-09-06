import { Image, Sidebar as AcioleSidebar } from "acioleui";

export function Sidebar() {
  return (
    <AcioleSidebar>
      <AcioleSidebar.Header
        icon={<Image src="/icon.svg" alt="AcioleUI" width={42} height={42} />}
        logo={<Image src="/logo.svg" alt="AcioleUI" height={42} />}
      />
      <AcioleSidebar.Item
        icon={
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        }
        active
      >
        Template
      </AcioleSidebar.Item>
    </AcioleSidebar>
  );
}
