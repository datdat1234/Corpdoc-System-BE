export default {
  system: {
    createDb: 'CREATE DATABASE "',
    createSchema: `
    SET statement_timeout = 0;
    SET lock_timeout = 0;
    SET idle_in_transaction_session_timeout = 0;
    SET client_encoding = 'UTF8';
    SET standard_conforming_strings = on;
    SELECT pg_catalog.set_config('search_path', '', false);
    SET check_function_bodies = false;
    SET xmloption = content;
    SET client_min_messages = warning;
    SET row_security = off; 
    SET default_tablespace = '';
    SET default_table_access_method = heap;
    
    CREATE TABLE public."Dept" (
        "DeptID" uuid NOT NULL,
        "Name" character varying NOT NULL,
        "RootFolderID" uuid,
        "Storage" double precision
    );
        
    CREATE TABLE public."File" (
        "FileID" uuid NOT NULL,
        "Name" character varying NOT NULL,
        "Criteria" character varying[] NOT NULL,
        "CreatedDate" timestamp with time zone NOT NULL,
        "Description" text,
        "HashValue" character varying NOT NULL,
        "Author" character varying NOT NULL,
        "Type" character varying NOT NULL,
        "Size" bigint NOT NULL,
        "Deleted" boolean NOT NULL,
        "Status" character varying NOT NULL,
        "IsPrivate" boolean NOT NULL,
        "NewValue" json,
        "SharedDeptID" uuid[] NOT NULL,
        "DeptID" uuid NOT NULL,
        "UploaderID" uuid NOT NULL,
        "Path" text[],
        "UpdatedDate" timestamp with time zone
    );
        
    CREATE TABLE public."Folder" (
        "FolderID" uuid NOT NULL,
        "Name" character varying,
        "Criteria" character varying[] NOT NULL,
        "CreatedDate" timestamp with time zone NOT NULL,
        "Description" text,
        "Author" character varying,
        "Deleted" boolean NOT NULL,
        "IsPrivate" boolean NOT NULL,
        "SharedDeptID" uuid[] NOT NULL,
        "DeptID" uuid NOT NULL,
        "CreatorID" uuid NOT NULL,
        "UpdatedDate" timestamp with time zone
    );
        
    CREATE TABLE public."Notification" (
        "NotificationID" uuid NOT NULL,
        "Title" text,
        "Description" text,
        "Time" timestamp with time zone NOT NULL,
        "IsSeen" boolean NOT NULL,
        "UserID" uuid NOT NULL
    );
        
    CREATE TABLE public."Path" (
        "AncestorID" uuid NOT NULL,
        "DescendantID" uuid NOT NULL,
        "Depth" smallint NOT NULL
    );
        
    CREATE TABLE public."Saved_File" (
        "FileID" uuid NOT NULL,
        "UserID" uuid NOT NULL
    );
        
    CREATE TABLE public."Saved_Folder" (
        "FolderID" uuid NOT NULL,
        "UserID" uuid NOT NULL
    );
        
    CREATE TABLE public."User" (
        "UserID" uuid NOT NULL,
        "Username" character varying NOT NULL,
        "Password" character varying NOT NULL,
        "Name" character varying NOT NULL,
        "Role" character varying NOT NULL,
        "Status" character varying NOT NULL,
        "DeptID" uuid
    );`,
    createCstr: `    
    ALTER TABLE public."User" OWNER TO postgres;
    
    ALTER TABLE ONLY public."Dept"
        ADD CONSTRAINT "Dept_pkey" PRIMARY KEY ("DeptID");
    
    ALTER TABLE ONLY public."File"
        ADD CONSTRAINT "File_pkey" PRIMARY KEY ("FileID");
    
    ALTER TABLE ONLY public."Folder"
        ADD CONSTRAINT "Folder_pkey" PRIMARY KEY ("FolderID");
    
    ALTER TABLE ONLY public."Notification"
        ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("NotificationID");
    
    ALTER TABLE ONLY public."Path"
        ADD CONSTRAINT "Path_pkey" PRIMARY KEY ("AncestorID", "DescendantID");
    
    ALTER TABLE ONLY public."Saved_File"
        ADD CONSTRAINT "Saved_File_pkey" PRIMARY KEY ("FileID", "UserID");
    
    ALTER TABLE ONLY public."Saved_Folder"
        ADD CONSTRAINT "Saved_Folder_pkey" PRIMARY KEY ("FolderID", "UserID");
    
    ALTER TABLE ONLY public."User"
        ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserID");
    
    ALTER TABLE ONLY public."Dept"
        ADD CONSTRAINT fk1 FOREIGN KEY ("RootFolderID") REFERENCES public."Folder"("FolderID") NOT VALID;
    
    ALTER TABLE ONLY public."User"
        ADD CONSTRAINT fk1 FOREIGN KEY ("DeptID") REFERENCES public."Dept"("DeptID") NOT VALID;
    
    ALTER TABLE ONLY public."Saved_Folder"
        ADD CONSTRAINT fk1 FOREIGN KEY ("FolderID") REFERENCES public."Folder"("FolderID") NOT VALID;
    
    ALTER TABLE ONLY public."Saved_File"
        ADD CONSTRAINT fk1 FOREIGN KEY ("FileID") REFERENCES public."File"("FileID") NOT VALID;
    
    ALTER TABLE ONLY public."Path"
        ADD CONSTRAINT fk1 FOREIGN KEY ("AncestorID") REFERENCES public."Folder"("FolderID") NOT VALID;
    
    ALTER TABLE ONLY public."Folder"
        ADD CONSTRAINT fk1 FOREIGN KEY ("DeptID") REFERENCES public."Dept"("DeptID") NOT VALID;
    
    ALTER TABLE ONLY public."Notification"
        ADD CONSTRAINT fk1 FOREIGN KEY ("UserID") REFERENCES public."User"("UserID");
    
    ALTER TABLE ONLY public."File"
        ADD CONSTRAINT fk1 FOREIGN KEY ("DeptID") REFERENCES public."Dept"("DeptID") NOT VALID;
    
    ALTER TABLE ONLY public."Saved_Folder"
        ADD CONSTRAINT fk2 FOREIGN KEY ("UserID") REFERENCES public."User"("UserID") NOT VALID;
    
    ALTER TABLE ONLY public."Saved_File"
        ADD CONSTRAINT fk2 FOREIGN KEY ("UserID") REFERENCES public."User"("UserID") NOT VALID;
    
    ALTER TABLE ONLY public."Path"
        ADD CONSTRAINT fk2 FOREIGN KEY ("DescendantID") REFERENCES public."Folder"("FolderID") NOT VALID;
    
    ALTER TABLE ONLY public."Folder"
        ADD CONSTRAINT fk2 FOREIGN KEY ("CreatorID") REFERENCES public."User"("UserID") NOT VALID;
    
    ALTER TABLE ONLY public."File"
        ADD CONSTRAINT fk2 FOREIGN KEY ("UploaderID") REFERENCES public."User"("UserID") NOT VALID;`,
  },
};
